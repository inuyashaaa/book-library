'use strict'

const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const nunjucks = require('nunjucks')
const env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(path.resolve(__dirname, './'))
)
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'booklibrary'
  }
})

const app = new Koa()
const router = new Router()

router.get('/', (ctx, next) => {
  return ctx.render('index.html', {
    message: 'this is a long message'
  })
})

router.get('/api/v1/books', async (ctx, next) => {
  const listBook = await knex.select().from('books')
  return ctx.render('index.html', {
    listBook
  })
})

router.post('/api/v1/book/:id', async (ctx, next) => {
  const idBook = ctx.params.id

  const book = await knex('books').where('id', idBook)
  if (book[0].number >= 2) {
    const success = await knex('books')
      .where('id', idBook)
      .update('sv', true)
    if (success) {
      ctx.body = {
        success: true,
        message: `Update success`
      }
      return ctx.body
    }
  }
  ctx.body = {
    success: false,
    message: `Update false`
  }
  return ctx.body
})

router.post('/api/v1/edit/:id', async (ctx, next) => {
  const idBook = ctx.params.id

  const book = await knex('books').where('id', idBook)
  if (book[0].number >= 2) {
    const success = await knex('books')
      .where('id', idBook)
      .update('sv', true)
    if (success) {
      ctx.body = {
        success: true,
        message: `Update success`
      }
      return ctx.body
    }
  }
  ctx.body = {
    success: false,
    message: `Update false`
  }
  return ctx.body
})

app
  .use(views(path.resolve(__dirname, './'), {
    options: {
      nunjucksEnv: env
    },
    map: { html: 'nunjucks' }
  }))
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app
