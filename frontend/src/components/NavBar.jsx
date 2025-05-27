export default function NavBar(){
    return (

            <div id="navigationbar">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        
          <a class="navbar-brand" href="/">
            <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
            Tech Bangladesh</img>
          </a>
        
        

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="https://www.google.com/">DEMO</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="{{ url_for('main.products',category = 'laptop')}}">Laptops</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="{{ url_for('main.products',category = 'tablet')}}">Tablets</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="{{ url_for('main.products',category = 'phone')}}">Phones</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">PC</a>
            </li>
            <li class="nav_item">

              <a class="nav-link" href="/login">Login</a>
            </li>

          </ul>

          <form method="post" class="d-flex" action="{{ url_for('searching.search')}}" id="searchform">
            <input class="form-control me-2" list="datalist" type="text" placeholder="Search" aria-label="Search"
              name="keyword" id="searchvalue"></input>

          

            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </div>

    )
}