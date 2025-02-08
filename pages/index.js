import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

function HomePage(props) {
    return (
        <>
            <Head>
                <title>aaaaaaa</title>
                <meta name="description" content="browse a huge" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     return {
//         props: {
//             meetups: []
//         }
//     }
// }

export async function getStaticProps() {
    const client = await MongoClient.connect(
        "mongodb+srv://hoangtuyen1106:96j7DtL2CZeOeyhv@our-first-user.mnbdv.mongodb.net/meetups?retryWrites=true&w=majority&appName=our-first-user"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 10,
    };
}

export default HomePage;
