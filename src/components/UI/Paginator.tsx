export default function Paginator({max_page, current_page, onPageChange, custom_page_names}: {
    max_page: number,
    current_page: number,
    onPageChange: (page: number) => void,
    custom_page_names?: string[]
}) {
    function MakePaginator() {
        const pages = []
        for (let i = 0; i <= max_page; i++) {
            pages.push(<li className={`page-item ${i === current_page ? "active" : ""}`} key={i}>
                <a className="page-link"
                   href={"#"}
                   onClick={(event) => {
                       event.preventDefault()
                       if (i !== current_page) {
                           onPageChange(i)
                       }
                   }}>{
                    custom_page_names ? custom_page_names[i] : i + 1
                }</a>
            </li>)
        }
        return pages
    }

    return (
        <nav className={"d-flex justify-content-center"}>
            <ul className="pagination">
                {
                    MakePaginator()
                }
            </ul>
        </nav>
    )
}