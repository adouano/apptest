import React from "react";

const Pagination = ({totalPerson, personPerPage, currentPage, setCurrentPage}) => {
    let pages = [];
    // const pageCount = Math.ceil(fetchData.length / personPerPage);
    const pageCount = Math.ceil(totalPerson / personPerPage);
    for(let i = 1; i <= pageCount; i++){
        pages.push(i);
    }

    const nextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, pageCount));
    };
    
    const previousPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1));
    };

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item" onClick={previousPage}>
                        <a className="page-link">Precedent</a>
                    </li>
                    {pages.map((page, index) => {
                        return <li key={index} onClick={() => setCurrentPage(page)} className={page == currentPage ? 'active' : 'page-item'}><a className="page-link">{page}</a></li>
                    })}                   
                    <li className="page-item" onClick={nextPage}>
                        <a className="page-link">Suivant</a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;