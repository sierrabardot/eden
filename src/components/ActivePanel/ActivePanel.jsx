import { useActiveComp } from "../../contexts/ActiveCompProvider";

export function ActivePanel() {
    const { activeComponent, activeComponentData } = useActiveComp()
    return (
        <div>
            {activeComponent ? (
                <div>
                    {activeComponent === 'Saved Locations' && (
                        <div>
                            <p>TODO: display required info</p>
                            <button className="btn btn-dark" disabled={activeComponentData.is_wishlist}>Wishlist</button>
                            <button className="btn btn-dark" disabled={activeComponentData.is_favourite}>Favourite</button>
                        </div>
                    )}
                    {activeComponent === 'History' && (
                        <div>
                            <p>TODO: create history component</p>
                        </div>
                    )}
                    {activeComponent === 'Search' && (
                        <div>
                            <p>TODO: create search component</p>
                        </div>
                    )}
                    {activeComponent === 'Settings' && (
                        <div>
                            <p>TODO: add settings to update user info</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa assumenda nesciunt ipsam eveniet quis dignissimos, perspiciatis accusamus quibusdam sapiente ipsum omnis quod. Minus cupiditate aliquid tempore porro, consequuntur a repellendus.</div>
            )}
        </div>
    )
}