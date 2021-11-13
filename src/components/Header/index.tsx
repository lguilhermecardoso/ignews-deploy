import { SigInButton } from '../SigInButton'
import styles from './styles.module.scss'
import { ActiveLink } from '../ActiveLink';

export function HeaderAplication() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ignews"/>
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SigInButton />
      </div>
    </header>
  )
}