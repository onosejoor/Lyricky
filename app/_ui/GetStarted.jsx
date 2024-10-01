const { default: Link } = require("next/link")

const GetStarted = () => {
    return (<>
    <section id="getStarted">
        <div className="started">
            <h1 className="startedH1">Fetch A Song Lyric Today!</h1>

            <Link href={"lyrics"}><button className="startedBtn">Get Started</button></Link>
        </div>
    </section>
    </>)
}

export default GetStarted