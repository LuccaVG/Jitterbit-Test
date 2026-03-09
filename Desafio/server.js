const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = 'mongodb://localhost:27017/pedidos_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB conectado com sucesso'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const ItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true, index: true },
  value: { type: Number, required: true },
  creationDate: { type: Date, required: true },
  items: [ItemSchema]
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

app.post('/order', async (req, res) => {
  try {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    if (!numeroPedido || valorTotal === undefined || !dataCriacao || !items) {
      return res.status(400).json({
        error: 'Dados incompletos',
        message: 'Os campos numeroPedido, valorTotal, dataCriacao e items sao obrigatorios.'
      });
    }

    const existingOrder = await Order.findOne({ orderId: numeroPedido });
    if (existingOrder) {
      return res.status(409).json({
        error: 'Conflito',
        message: 'Pedido com ID ' + numeroPedido + ' ja existe.'
      });
    }

    const pedidoData = {
      orderId: numeroPedido,
      value: valorTotal,
      creationDate: new Date(dataCriacao),
      items: items.map(item => ({
        productId: parseInt(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem
      }))
    };

    const novoPedido = new Order(pedidoData);
    await novoPedido.save();

    res.status(201).json({
      message: 'Pedido criado com sucesso',
      data: novoPedido
    });

  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Conflito', message: 'ID do pedido ja existe.' });
    }
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

app.get('/order/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Order.findOne({ orderId: id });

    if (!pedido) {
      return res.status(404).json({
        error: 'Não encontrado',
        message: 'Nenhum pedido encontrado com o ID: ' + id
      });
    }

    res.status(200).json(pedido);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({ error: 'Erro interno', message: error.message });
  }
});

app.get('/order/list', async (req, res) => {
  try {
    const pedidos = await Order.find().sort({ creationDate: -1 });
    res.status(200).json({
      total: pedidos.length,
      data: pedidos
    });
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({ error: 'Erro interno', message: error.message });
  }
});

app.put('/order/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { valorTotal, items } = req.body;

    const updateData = {};
    if (valorTotal !== undefined) updateData.value = valorTotal;
    if (items) {
      updateData.items = items.map(item => ({
        productId: parseInt(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem
      }));
    }

    const pedidoAtualizado = await Order.findOneAndUpdate(
      { orderId: id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!pedidoAtualizado) {
      return res.status(404).json({
        error: 'Não encontrado',
        message: 'Pedido com ID ' + id + ' não existe.'
      });
    }

    res.status(200).json({
      message: 'Pedido atualizado com sucesso',
      data: pedidoAtualizado
    });
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    res.status(500).json({ error: 'Erro interno', message: error.message });
  }
});

app.delete('/order/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoDeletado = await Order.findOneAndDelete({ orderId: id });

    if (!pedidoDeletado) {
      return res.status(404).json({
        error: 'Não encontrado',
        message: 'Pedido com ID ' + id + ' não existe.'
      });
    }

    res.status(200).json({
      message: 'Pedido deletado com sucesso',
      data: pedidoDeletado
    });
  } catch (error) {
    console.error('Erro ao deletar pedido:', error);
    res.status(500).json({ error: 'Erro interno', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:27017/');
});