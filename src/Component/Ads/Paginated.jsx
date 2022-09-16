import Pagination from "react-bootstrap/Pagination";
import { useState } from "react";
import './Ads.css'

function Paginated({
  currentPage,
  allAds,
  adsPerPage,
  changePagePrev,
  paginated,
  changePageNext,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allAds / adsPerPage); i++) {
    pageNumbers.push(i);
  }
  const [pageLimit, setPageLimit] = useState(null);

  // const getPages = () => {
  //   pageNumbers<5?setPageLimit(pageNumbers):setPageLimit(5)
  //   let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
  //   return new Array(pageLimit).fill().map((_, i) => start + i + 1);
  // }

  return (
    <Pagination>
      <Pagination.First onClick={() => paginated(1)} />
      {pageNumbers.length >= 2 && currentPage !== 1 ? (
        <Pagination.Prev onClick={changePagePrev} />
      ) : null}

      {pageNumbers?.map((number) => (
        <Pagination.Item
          active={currentPage === number ? true : false}
          onClick={() => paginated(number)}
        >
          {number}
        </Pagination.Item>
      ))}

      {pageNumbers.length > 1 && currentPage !== pageNumbers.length ? (
        <Pagination.Next onClick={changePageNext} />
      ) : null}
      <Pagination.Last onClick={() => paginated(pageNumbers.length)} />
    </Pagination>
  );
}

export default Paginated;
