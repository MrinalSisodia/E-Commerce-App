import { Link } from "react-router-dom";

export default function HomePage() {
  const categories = [
    {
      title: "Mens",
      img: "https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg",
    },
    {
      title: "Womens",
      img: "https://images.pexels.com/photos/17243615/pexels-photo-17243615.jpeg",
    },
    {
      title: "Kids",
      img: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg",
    },
    {
      title: "Electronics",
      img: "https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg",
    },
    {
      title: "Home",
      img: "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg",
    },
  ];

  return (
    <div className="container-fluid py-3">
     <h3 className="mb-4 bg-warning-subtle p-3 rounded shadow-sm text-uppercase text-center">
  Shop By Category
</h3>

      <div className="row g-4">
        {categories.map((cat, index) => (
          <div className="col-md-4" key={index}>
            <Link to={`/products/by-category/${cat.title}`} >
              <div className="card bg-dark text-white border-0">
                <img
                  src={`${cat.img}?auto=compress&cs=tinysrgb&w=550&h=320&dpr=1`}
                  className="card-img"
                  alt={cat.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-img-overlay d-flex align-items-center justify-content-center p-0">
                  <div
                    className="w-100 text-center bg-dark bg-opacity-75 py-2"
                    style={{ position: "absolute", top: "50%", transform: "translateY(-50%)" }}
                  >
                    <h3 className="m-0 text-white">{cat.title}</h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
