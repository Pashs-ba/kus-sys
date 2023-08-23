import "bootstrap/dist/js/bootstrap.bundle.min";
export default function ModalButton({connected_with, button_text, additionalClasses, preOpen}: {
    connected_with: string,
    button_text?: string,
    additionalClasses?: string,
    preOpen?: () => void
}) {
    return (
        <button type="button"
                className={`btn btn-primary ${additionalClasses}`}
                data-bs-toggle="modal"
                onClick={preOpen}
                data-bs-target={`#${connected_with}`}>
            {button_text ? button_text : "Click!"}
        </button>
    )
}