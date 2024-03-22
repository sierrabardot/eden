import { useActiveComp } from "../../contexts/ActiveCompProvider";
import { SavedLocationItem } from "../NavigationComponent/SavedLocationItem/SavedLocationItem";
import { SearchItem } from "../NavigationComponent/SearchItem/SearchItem";
import { useLoading } from "../../contexts/LoadingProvider";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner"
import { Link } from "react-router-dom";

export function ActivePanel() {
    const { activeComponent, activeComponentData } = useActiveComp()
    const { loading } = useLoading()
    
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
                            {activeComponent === 'Search' && (
                                <div className="m-md-4 mt-4">
                                    <h2 className="mb-4">Search</h2>
                                    <Link to='/map' className="btn btn-success mb-3">View on Map</Link>
                                    {activeComponentData.map(location => (
                                        <SearchItem key={location.id} location={location} />
                                    ))}
                                </div>
                            )}
                            {activeComponent === 'Saved Locations' && (
                                <div className="m-md-4 mt-4">
                                    <h2 className="mb-4">Saved Locations</h2>
                                    <Link to='/map' className="btn btn-success mb-3">View on Map</Link>
                                    {activeComponentData.map(location => (
                                        <SavedLocationItem key={location.id} location={location} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa assumenda nesciunt ipsam eveniet quis dignissimos, perspiciatis accusamus quibusdam sapiente ipsum omnis quod. Minus cupiditate aliquid tempore porro, consequuntur a repellendus.</div>
                    )}
                </div>
            )}
        </div>
    )
}