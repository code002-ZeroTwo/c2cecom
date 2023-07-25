import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  const [content, setContent] = useState([]);


  const decodedImage = (codedval) => {
    const decoded = atob(codedval);
    const byteArray = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
      byteArray[i] = decoded.charCodeAt(i);
    }

    // Create a Blob object from the Uint8Array
    const blob = new Blob([byteArray], { type: "image/png" });

    // Use the blob as needed, for example, to display the image
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };

  const displayByCategory = (category) => {
    return content.map((content) => {
      if (category === content.category) {
        // return html element?
        const htmlcontent = (
          <>
            <div className="single-container">
              <div className="card shadow-sm">
                <img
                  aria-label="Placeholder: Thumbnail"
                  className="bd-placeholder-img card-img-top"
                  width="100%"
                  height="225"
                  src={decodedImage(content.image)}
                />
                <title>Placeholder</title>
                <div className="card-body">
                  <p className="card-text">{content.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link
                        to=
                          {`/products/${content.product_id}`}
                          state= {content} 
                        
                        className="btn btn-sm btn-outline-secondary"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
        return htmlcontent;
      }
    });
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/product", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      setContent(content);
    })();
  }, []);

  return (
    // divide the content based on category
    <>
      {Array.from(new Set(content.map((products) => products.category))).map(
        (category) => {
          // create different componenet for different category?
          return (
            <div className="product-container-container">
              <h1 key={category}>{category}</h1>
              <hr />
              <div className="product-container">
                {displayByCategory(category)}
              </div>
            </div>
          );
        }
      )}
    </>
  );
};

export default Home;
