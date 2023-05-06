import { UserCreate } from "../services/User/create.js"
import { UserRead } from "../services/User/read.js"
import { UserUpdate } from "../services/User/update.js"
import { UserDelete } from "../services/User/delete.js"
import { UserWon } from "../services/User/won.js"
import { UserLoses } from "../services/User/loses.js"
import { UserTransferMoney } from "../services/User/transfer.js"

export class UserController {
  async create(req, res) {
    const { name, serialized } = req.body
    
    try {
      const userCreateService = new UserCreate()
      const userCreateResult = await userCreateService.execute({
        name,
        serialized
      })
      
      if(userCreateResult instanceof Error) { return res.status(400).send({ message: userCreateResult.message }) }
      
      return res.status(201).send({ message: userCreateResult })
      
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }
  
  async read(req, res) {
    const { serialized } = req.query
    
    try {
      const userReadService = new UserRead()
      const userReadResult = await userReadService.execute(serialized)
      
      if(userReadResult instanceof Error) { return res.status(400).send({ message: userReadResult.message }) }
      
      return res.status(200).send(userReadResult)
      
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }

  async update(req, res) {
    const { serialized } = req.params
    const { money, bets } = req.body
    
    try {
      const userUpdateService = new UserUpdate()
      const userUpdateResult = await userUpdateService.execute({
        serialized,
        money: Math.abs(money),
        bets: Math.abs(bets)
      })
      
      if(userUpdateResult instanceof Error) { return res.status(400).send({ message: userUpdateResult.message }) }
      
      return res.status(200)
      
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }
  
  async delete(req, res) {
    const { serialized } = req.params
    
    try {
      const userDeleteService = new UserDelete()
      const userDeleteResult = await userDeleteService.execute(serialized)
      
      if(userDeleteResult instanceof Error) { return res.status(400).send({ message: userDeleteResult.message }) }
      
      return res.status(200).send(userDeleteResult)
    } catch(error)  {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }
  
  async won(req, res) {
    const { serialized } = req.params
    const { money, luckCoin } = req.body
    
    try {
      const userWonService = new UserWon()
      const userWonResult = await userWonService.execute({
        serialized,
        money: Math.abs(money),
        luckCoin: Math.abs(luckCoin)
      })
      
      if(userWonResult instanceof Error) { return res.status(400).send({ message: userWonResult.message }) }
      
      return res.status(200)
      
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }
  
  async loses(req, res) {
    const { serialized } = req.params
    const { money } = req.body
    
    try {
      const userLosesService = new UserLoses()
      const userLosesResult = await userLosesService.execute({
        serialized,
        money: Math.abs(money)
      })
      
      if(userLosesResult instanceof Error) { return res.status(400).send({ message: userLosesResult.message }) }
      
      return res.status(200)
      
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }
  
  async transfer(req, res) {
    const { send_serialized, receive_serialized } = req.params
    const { money } = req.body
    
    try {
      const userTransferService = new UserTransferMoney()
      const userTransferResult = await userTransferService.execute({
        send_serialized,
        receive_serialized,
        money: Math.abs(money)
      })
      
      if(userTransferResult instanceof Error) { return res.status(400).send({ message: userTransferResult.message }) }
      
      return res.status(200).send(userTransferResult)
      
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }
}
