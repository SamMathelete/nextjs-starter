import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Home | React Meetups</title>
        <meta name="description" content="Awesome Meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://SamTheMathlete:wAE83EDVKxWdl9Mg@cluster0.nbip8pj.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = (await meetupCollection.find().toArray()).map((meetup) => {
    return {
      title: meetup.title,
      address: meetup.address,
      id: meetup._id.toString(),
      image: meetup.image,
    };
  });
  return {
    props: {
      meetups: meetups,
    },
    revalidate: 10,
  };
};

export default HomePage;
