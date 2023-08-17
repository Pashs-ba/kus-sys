export default function Paginator({max_page, current_page, onPageChange}: {
    max_page: number,
    current_page: number,
    onPageChange: (page: number) => void
}) {
    function MakePaginator() {
        const pages = []
        for (let i = 0; i <= max_page; i++) {
            if (i === current_page) {
                pages.push(<li className="page-item active" key={i}>
                    <a className="page-link"
                       href={"#"}
                       onClick={(event) => {
                           event.preventDefault()
                       }}>{i + 1}</a>
                </li>)
            } else {
                pages.push(<li className="page-item" key={i}>
                    <a className="page-link"
                       href="#"
                       onClick={(event) => {
                           event.preventDefault()
                           onPageChange(i)
                       }}
                    >{i + 1}</a>
                </li>)
            }
        }
        return pages
    }

    return (
        <nav aria-label="Page navigation example" className={"d-flex justify-content-center"}>
            <ul className="pagination">
                {
                    MakePaginator()
                }
            </ul>
        </nav>
    )
}