import DataLoader from 'dataloader'
import models from '../models'

export default class CustomDataLoader {
  users = new DataLoader(async (SSNs) => {
    const users = await models.db.Users.findAll({
      where: {
        SSN: SSNs
      }
    })
    return users.sort((a, b) => SSNs.indexOf(a.SSN) - SSNs.indexOf(b.SSN))
  })
  cards = new DataLoader(async (cardNos) => {
    const cards = await models.db.Cards.findAll({
      where: {
        cardNo: cardNos
      }
    })
    return cards.sort((a, b) => cardNos.indexOf(a.cardNo) - cardNos.indexOf(b.cardNo))
  })
  cardTypes = new DataLoader(async (ids) => {
    const cardTypes = await models.db.CardTypes.findAll({
      where: {
        id: ids
      }
    })
    return cardTypes.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
  })
  transactions = new DataLoader(async (ids) => {
    const transactions = await models.db.Transactions.findAll({
      where: {
        id: ids
      }
    })
    return transactions.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
  })
  transactionTypes = new DataLoader(async (ids) => {
    const transactionTypes = await models.db.TransactionTypes.findAll({
      where: {
        id: ids
      }
    })
    return transactionTypes.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
  })
  insurances = new DataLoader(async (ids) => {
    const insurances = await models.db.Insurances.findAll({
      where: {
        id: ids
      }
    })
    return insurances.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
  })
  insuranceTypes = new DataLoader(async (ids) => {
    const insuranceTypes = await models.db.InsuranceTypes.findAll({
      where: {
        id: ids
      }
    })
    return insuranceTypes.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
  })
  depositTypes = new DataLoader(async (ids) => {
    const depositTypes = await models.db.DepositTypes.findAll({
      where: {
        id: ids
      }
    })
    return depositTypes.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
  })
}