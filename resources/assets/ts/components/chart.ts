import type MonthlyAnalytic from '#models/monthly_analytic'
import Chart from 'chart.js/auto'

export class DashboardChart extends HTMLCanvasElement {
  static Month = {
    1: 'Janvier',
    2: 'Février',
    3: 'Mars',
    4: 'Avril',
    5: 'Mai',
    6: 'Juin',
    7: 'Juillet',
    8: 'Août',
    9: 'Septembre',
    10: 'Octobre',
    11: 'Novembre',
    12: 'Décembre',
  }
  static observedAttributes = ['data-analytics']

  constructor() {
    super()
  }

  connectedCallback() {
    const data = JSON.parse(this.getAttribute('data-analytics')) as MonthlyAnalytic[]
    if (data) {
      new Chart(this, {
        type: 'bar',
        data: {
          labels: data.map((row) => DashboardChart.Month[row.month]),
          datasets: [
            {
              label: 'Nombre de visite',
              data: data.map((row) => row.visit),
            },
          ],
        },
      })
    }
  }
}
