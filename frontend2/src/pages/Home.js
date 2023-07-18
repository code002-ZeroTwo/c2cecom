const Home = (props) => {
  return (
    <div>
      <h1>{props.name ? "Hi, " + props.name : "You are not authenticated"}</h1>
    </div>
  );
};

export default Home;
