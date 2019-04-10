import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

const Modal = ({ isVisible = true, children, title = '', onToggle }) => {
	const toggleVisibility = toggler => onToggle && onToggle(toggler)

	useEffect(() => {
		document.body && document.body.classList.toggle('modal-open', isVisible)
	})

	const titleElement = title && (
		<div className="modal-header">
			<h5 className="modal-title">{title}</h5>
			<button
				type="button"
				className="close"
				data-dismiss="modal"
				aria-label="Close"
				onClick={() => toggleVisibility(false)}
			>
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	)

	const modalElement = (
		<React.Fragment>
			<div
				className={classNames('modal fade', isVisible && 'show')}
				tabIndex="-1"
				role="dialog"
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						{titleElement}
						{children}
					</div>
				</div>
			</div>
			<div
				className={classNames('modal-backdrop fade', isVisible && 'show')}
				onClick={() => toggleVisibility(false)}
			/>
		</React.Fragment>
	)

	const modalRootElement = document.getElementById('overlay')

	return isVisible && ReactDOM.createPortal(modalElement, modalRootElement)
}

export default Modal
