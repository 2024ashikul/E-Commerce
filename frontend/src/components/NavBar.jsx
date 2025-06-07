export default function NavBar(){
    return (

            <div id="navigationbar">
    <nav classNameName="navbar navbar-expand-lg bg-body-tertiary">
      <div classNameName="container-fluid">
        
          <a classNameName="navbar-brand" href="/">
            <img src="" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"></img>
            Tech Bangladesh
          </a>
        
        

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="https://www.google.com/">DEMO</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="{{ url_for('main.products',category = 'laptop')}}">Laptops</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="{{ url_for('main.products',category = 'tablet')}}">Tablets</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="{{ url_for('main.products',category = 'phone')}}">Phones</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">PC</a>
            </li>
            <li className="nav_item">

              <a className="nav-link" href="/login">Login</a>
            </li>

          </ul>

          <form method="post" className="d-flex" action="{{ url_for('searching.search')}}" id="searchform">
            <input className="form-control me-2" list="datalist" type="text" placeholder="Search" aria-label="Search"
              name="keyword" id="searchvalue"></input>

          

            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </div>

    )
}