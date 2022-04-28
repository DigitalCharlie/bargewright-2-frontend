import styles from './Footer.module.css';


export default function Footer ({user, setUser}) {
    return (
        <footer>
			<p className={styles.disclaimer}>The Bargewright Inn bears no responsibility for any collisions that may occur as a result of charging headlong into battle after too many pints of Dragondew, Firedrake or Evermead. Do not blame The Bargewright Inn for any squabbles that occur as a result of a DM checking your logs. Despite the record keeping service offered by the Inn, however, the Inn hopes that any DM who does check logs of a player is tossed into the gaping maw of Dendar the night serpent. Unless, of course, that player is rude and disruptive, in which case, may Tyr bless you.</p>
        </footer>
    )
}