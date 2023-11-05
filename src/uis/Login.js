import "./Login.css"

export function Login() {
    return <div className="d-flex flex-column min-vh-100">
        <div className="container-fluid bg-dark text-white p-1">
            <h1>Learning English</h1>
        </div>
        <div className="row">
            <div className="col"></div>
            <div className="col-3">
                <h1 className="text-center fs-1 fw-bolder m-5">Login to have fun and learn faster!</h1>
                <div className="row my-3">
                    <button type="button" class="col-11 mx-auto btn btn-primary d-flex justify-content-between" style={{ borderRadius: 30 }}>
                        <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" width="25" className="bg-light rounded-circle p-1" />
                        <div className="flex-fill">Sign in with Google</div>
                    </button>
                </div>
                <p class="hr-line my-3">or</p>
                <form action="">
                    <div class="my-3">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="email" placeholder="placeholder@domain.com" name="email" />
                    </div>
                    <div class="my-3">
                        <label for="pwd" class="form-label">Password:</label>
                        <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" />
                    </div>
                    <div class="form-check mb-3 d-flex justify-content-between align-items-center">
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" name="remember" /> Remember me
                        </label>
                        <button type="button" className="btn btn-link text-dark">I forgot my password!</button>
                    </div>
                    <div className="row">
                        <button type="submit" class="col-11 mx-auto btn btn-primary">Submit</button>
                    </div>
                </form>
                <div className="row m-3">
                    <button type="submit" class="col-12 mx-auto btn btn-link text-dark">Don't have an account? Sign up now!</button>
                </div>
            </div>
            <div className="col"></div>
        </div>
        <footer className="container-fluid bg-dark text-white mt-auto p-2">
            <p>"It's never too late to start a new adventure" - Unknown</p>
        </footer>
    </div>;
}