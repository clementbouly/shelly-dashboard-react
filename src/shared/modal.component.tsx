import { ReactComponent as CloseIcon } from "../assets/close.svg"
import styles from "./modal.module.css"

interface ModalProps {
	title: string
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

const ModalComponent = (props: ModalProps) => {
	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation()
	}

	return (
		<>
			{props.isOpen && (
				<div className={styles.backdrop} onClick={props.onClose}>
					<div className={styles.modal} onClick={handleClick}>
						<div className={styles.heading}>
							<h2>{props.title}</h2>
							<CloseIcon onClick={props.onClose} className={styles.closeIcon} />
						</div>
						<div className={styles.body}>{props.children}</div>
					</div>
				</div>
			)}
		</>
	)
}

export default ModalComponent
