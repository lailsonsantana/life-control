interface SubtitleProps{
    text: string
}

const Subtitle: React.FC<SubtitleProps> = ({text}) => {

    return(
            <h2 className="text-3xl sm:text-2xl font-bold text-black">
                {text}
            </h2>

    )
}

export default Subtitle;