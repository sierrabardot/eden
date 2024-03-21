import { useActiveComp } from "../../contexts/ActiveCompProvider";
import { AdventureLogItem } from "../NavigationComponent/AdventureLogItem/AdventureLogItem";
import { SavedLocations } from "../NavigationComponent/SavedLocations/SavedLocations";
import { SearchItem } from "../NavigationComponent/SearchItem/SearchItem";
import { useLoading } from "../../contexts/LoadingProvider";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner"
import { Link } from "react-router-dom";

export function ActivePanel() {
    const { activeComponent, activeComponentData } = useActiveComp()
    const { loading } = useLoading()
    
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    {activeComponent ? (
                        <div>
                            {activeComponent === 'Adventure Log' && (
                                <div>
                                    {activeComponentData.map(location => (
                                        <AdventureLogItem key={location.id} record={location} />
                                    ))}
                                </div>
                            )}
                            {activeComponent === 'Search' && (
                                <div>
                                    <Link to='/map' className="btn btn-primary">View on Map</Link>
                                    {activeComponentData.map(location => (
                                        <SearchItem key={location.id} location={location} />
                                    ))}
                                </div>
                            )}
                            {activeComponent === 'Saved Locations' && (
                                <div>
                                    <Link to='/map' className="btn btn-primary">View on Map</Link>
                                    {activeComponentData.map(location => (
                                        <SavedLocations key={location.id} location={location} />
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