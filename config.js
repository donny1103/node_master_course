// Container for all the enviroments
const enviroments = {} ;

// Staging (default) enviroment
enviroments.staging = {
    port:3000,
    envName:'staging'
};

// Production enviroment
enviroments.production = {
    port:5000,
    envName:'production'
}

// Determine which enviroment was passed as a command-line argument
const currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current enviroment is one of th enviroments above, if not, dafault to staging
const enviromentToExport = typeof(enviroments[currentEnviroment]) == 'object' ? enviroments[currentEnviroment] : enviroments.staging;

module.exports = enviromentToExport;