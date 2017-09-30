/* eslint-disable class-methods-use-this, no-empty-function, no-unused-vars */
/* Это базовый класс, здесь можно пустые методы */

class Model {
  /**
     * @returns {Promise.<void>}
     */
  async getAll() {}

  /**
     * @returns {Promise.<void>}
     */
  async create() {}

  /**
     * @param {Number} id Индентификатор записи
     * @returns {Promise.<void>}
     */
  async remove(id) {}

  /**
     * @param {Number} id Индентификатор записи
     * @param {Object} data Новое состояние
     * @returns {Promise.<void>}
     */
  async update(id, data) {}
}

module.exports = Model;
