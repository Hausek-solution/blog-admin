import HeaderEnd from "./header-end"
import HeadeStart from "./header-start"

const Header = () => {
    return (
        <>
            <div className="flex justify-between items-center app-container py-7 md:py-5 font-outfit">
                <HeadeStart/>

                <HeaderEnd/>
            </div>
        </>
    )
}

export default Header