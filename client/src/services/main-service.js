class MainService {
  constructor(backendUrl) {
    this.backendUrl = backendUrl;
  }

  // Gets data from tree.json
  async getCollection() {
    const collectionRequest = await fetch(`${this.backendUrl}/collections`);
    return await collectionRequest.json();
  }

  // Gets item by ID
  async getItemById(id) {
    const itemRequest = await fetch(`${this.backendUrl}/collection/${id}`);
    return await itemRequest.json();
  }

  // Updates specific Item
  async updateItem(id, editedItem) {
    await fetch(`${this.backendUrl}/collection/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedItem),
    });
  }
}

export default MainService;
