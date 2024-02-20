import type{ ModelStatic } from 'sequelize'
import resp from '../utils/resp'

import User from '../db/models/user'
import type{ IUser } from '../interfaces/IUser'
import { userBodySchema } from './validations/schema'

import md5 from 'md5'
import { sign } from '../jwt/jwt'
import { randomUUID } from 'crypto'

class UserService {
  private model: ModelStatic<User> = User

  async get() {
    const users = await this.model.findAll()

    return resp(200, users)
  }

  async login(body: { email: string, password: string }) {
    const hashPassword = md5(body.password)

    const user = await this.model.findOne({
      where: {
        email: body.email,
        password: hashPassword
      }
    })

    if(!user) return resp(404, 'User not found')

    const { id, email } = user

    const token = sign({ id, email })

    return resp(200, { id, email, token })
  }

  async create(body: IUser) {
    const bodyParse = userBodySchema.safeParse(body)

    if(!bodyParse.success) {
      return resp(400, { message: bodyParse.error.message})
    }

    const hashPassword = md5(bodyParse.data.password)
    const createUser = await this.model.create({
      id: randomUUID(),
      email: bodyParse.data.email,
      password: hashPassword
    })

    return resp(201, createUser)
  }
}

export default UserService