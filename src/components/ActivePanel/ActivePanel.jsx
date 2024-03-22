import { useActiveComp } from "../../contexts/ActiveCompProvider";
import { SavedLocationItem } from "../SavedLocationItem/SavedLocationItem";
import { SearchItem } from "../SearchItem/SearchItem";
import { useLoading } from "../../contexts/LoadingProvider";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner"
import { Link } from "react-router-dom";
import { useState } from "react";

export function ActivePanel() {
    const { activeComponent, activeComponentData } = useActiveComp()
    const { loading } = useLoading()
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const data = activeComponentData || [];
    console.log(activeComponentData)

    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItems = data.slice(firstItem, lastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            {loading ? (
                <div className="d-flex align-items-center justify-content-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <div>
                    {activeComponent ? (
                        <div>
                            {activeComponent === 'Find Nearby Locations' && (
                                <div className="m-md-4 my-4">
                                    <h2 className="mb-4">Find Nearby Locations</h2>
                                    <Link to='/map' className="btn btn-success mb-3">View on Map</Link>
                                    {currentItems.map(location => (
                                        <SearchItem key={location.id} location={location} />
                                    ))}
                                    <nav>
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                                    Previous
                                                </button>
                                            </li>
                                            <li className="page-item">
                                                <button className="page-link">{currentPage}</button>
                                            </li>
                                            <li className={`page-item ${lastItem >= data.length ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            )}
                            {activeComponent === 'Saved Locations' && (
                                <div className="m-md-4 mt-4">
                                    <h2 className="mb-4">Saved Locations</h2>
                                    <Link to='/map' className="btn btn-success mb-3">View on Map</Link>
                                    {currentItems.map(location => (
                                        <SavedLocationItem key={location.id} location={location} />
                                    ))}
                                    <nav>
                                        <ul className="mt-4 pagination">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                                    Previous
                                                </button>
                                            </li>
                                            <li className="page-item">
                                                <button className="page-link">{currentPage}</button>
                                            </li>
                                            <li className={`page-item ${lastItem >= data.length ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            )}
        </div>
    )
}