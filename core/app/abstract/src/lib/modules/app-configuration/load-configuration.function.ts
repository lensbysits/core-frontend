export function loadConfiguration(configurationUrl: string): Promise<any> {
    return fetch(configurationUrl)
        .then(response => {
            if (!response.ok) {
                throw { message: "Error while reading configuration: Response status was not 2xx.", reason: response };
            }
            return response.json()
        })
}