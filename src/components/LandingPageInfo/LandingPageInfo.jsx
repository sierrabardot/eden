export function LandingPageInfo() {
    return (
        <div className="container-fluid bg-rhs d-flex flex-column justify-content-center align-items-center">
            <img src="/assets/other/hero_logo.png" className="eden-logo my-4" alt="Eden Logo" />
            <p className="text-white mb-5 col-md-6 col-11 small text-center ">Welcome to Eden, where nature lovers, foragers, and those with a penchant for exploration unite!<br></br>
            Embark on a journey through our collaborative foraging map, where nature's wonders await for you.
            </p>
            <div className="container d-flex align-items-center justify-content-center">
                <div className="gap-4 d-flex flex-column">
                    {options.map((option) => (
                    <div key={option.id} className="rounded-pill bg-green p-3 d-flex align-items-center">
                        <img src={option.icon} className="icon-height mx-2" alt={option.icon} />
                        <p className="m-2 text-white fw-light">{option.text}</p>
                    </div>
                    ))}
                </div>
            </div>
            <div className="spacer"></div>
        </div>
    )
}

const options = [
    {
        id: 1,
        icon: '/assets/icons/i_search2.png',
        text: 'Explore the map to find foraging locations near you',
    },
    {
        id: 2,
        icon: '/assets/icons/i_map.png',
        text: `Create your own map using locations you've found`,
    },
    {
        id: 3,
        icon: '/assets/icons/i_marker_white.png',
        text: 'Find nature without ever leaving the suburbs',
    },

]