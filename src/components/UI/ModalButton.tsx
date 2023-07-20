import "bootstrap/dist/js/bootstrap.bundle.min";
export default function ModalButton({connected_with, button_text, additionalClasses}: {
    connected_with: string,
    button_text?: string,
    additionalClasses?: string
}) {
    return (
        <button type="button"
                className={`btn btn-primary ${additionalClasses}`}
                data-bs-toggle="modal"
                data-bs-target={`#${connected_with}`}>
            {button_text ? button_text : "Click!"}
        </button>
    )
}