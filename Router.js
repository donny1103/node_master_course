class Router {
  constructor() {
    this.routes = ['sample'];
    this.statusCode = 200;
    this.payload = {};
  }

  handler(path) {
    switch (path) {
      case 'sample':
        this.statusCode = 406;
        this.payload = {'name':'sampler handler'};
        break;
      default:
        this.statusCode = 404;
    }
  }
}

module.exports = Router;