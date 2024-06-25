interface VisistsProps {
  count: number
}

export const Visits = ({ count }: VisistsProps) => (
  <span id="visits" class="footer__link-container__link">
    Compteur de visite journalier : {count}
  </span>
)
