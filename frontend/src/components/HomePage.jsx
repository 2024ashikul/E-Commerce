export default function HomePage(){
    return (
        <div>
        <div className="container py-4">
    <div className="row justify-content-center mb-5">
        <div className="col-md-10">
            <div id="carouselExampleRide" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="../public/2.png" className="d-block w-100" alt="Banner 1"></img>
                    </div>
                    <div className="carousel-item">
                        <img src="../public/2.png" className="d-block w-100" alt="Banner 2"></img>
                    </div>
                    <div className="carousel-item">
                        <img src="../public/2.png" className="d-block w-100" alt="Banner 3"></img>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
    </div>
    </div>
    )
}