import { useActiveComp } from "../../contexts/ActiveCompProvider";
import { AdventureLogItem } from "../NavigationComponent/AdventureLogItem/AdventureLogItem";
import { SavedLocations } from "../NavigationComponent/SavedLocations/SavedLocations";
import { SearchItem } from "../NavigationComponent/SearchItem/SearchItem";

export function ActivePanel() {
    const { activeComponent, activeComponentData } = useActiveComp()
    console.log(activeComponentData)
    return (
        <div>
            {activeComponent ? (
                <div>
                    {activeComponent === 'Adventure Log' && (
                        <div>
                            {activeComponentData.map(record => (
                                <AdventureLogItem key={record.id} location={record} />
                            ))}
                        </div>
                    )}
                    {activeComponent === 'Search' && (
                        <div>
                            {activeComponentData.map(location => (
                                <SearchItem key={location.id} location={location} />
                            ))}
                        </div>
                    )}
                    {activeComponent === 'Saved Spots' && (
                        <div>
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
    )
}