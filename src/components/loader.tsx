import { CSSProperties } from "react"
import BeatLoader from "react-spinners/BeatLoader";

type SpinnerProps = {
    loading?: boolean,
    className?: CSSProperties,
    color?: string
}  

const classOverride : CSSProperties = {
    width : "10px",
    height: "10px"
}

const LoadingSpinner = ({
    className = classOverride,
    loading = true,
    color
}: SpinnerProps) => {
    
    return (
        <>
            <BeatLoader
                color={color ? color : "#132A23"}
                loading={loading}
                speedMultiplier={1.5}
                aria-label="Loading spinner"
                data-testid={"loader"}
                cssOverride={className}
            />
        </>
    )
}

export default LoadingSpinner