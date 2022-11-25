import createApiClient from "./api.service"

class DocumentService {
    constructor(baseUrl = "/home") {
        this.api = createApiClient(baseUrl);
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data
    }

    async moveToTrash(data) {
        return (await this.api.post('/trash-bin', data)).data;
    }

    async restore(id) {   
        return (await this.api.delete(`/trash-bin/${id}`)).data;
    }

    async getDeletedFile() {
        return (await this.api.get('/trash-bin')).data;
    }
}

export default new DocumentService();