const { default: Link } = require("next/link")

const GetStarted = () => {
    return (<>
    <section id="getStarted">
        <div className="started">
            <h2 className="startedH1">Fetch A Song Lyric Today!</h2>

            <Link href={"lyrics"}><button className="startedBtn">Get Started</button></Link>
        </div>
    </section>
    </>)
}

export default GetStarted