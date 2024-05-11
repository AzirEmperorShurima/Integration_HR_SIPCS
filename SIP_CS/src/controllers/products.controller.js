import Product from "../models/Product.js";

const USER_SEARCH_INDEX_NAME = 'user_search'
const USER_AUTOCOMPLETE_INDEX_NAME = 'user_autocomplete'


export const createProduct = async (req, res) => {
  const { name, category, price, imgURL } = req.body;

  try {
    const newProduct = new Product({
      name,
      category,
      price,
      imgURL,
    });

    const productSaved = await newProduct.save();

    res.status(201).json({success: true, data: productSaved});
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, data: error});
  }
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  res.status(200).json({success: true, data: product});
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  return res.json({success: true, data: products});
};

export const updateProductById = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json({success: true, data: updatedProduct});
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params;
  await Product.findByIdAndDelete(productId);
  // code 200 is ok too
  res.status(204).json({success: true, data: []});
};


// export const search = async (req, res) => {
//   const searchQuery = req.query.query
//   const country = req.query.name

//   if (!searchQuery || searchQuery.length < 2) {
//     res.json([])
//     return
//   }

//   // const db = mongoClient.db('tutorial')
//   // const collection = db.collection<Product>(MONGODB_COLLECTION)
//   const collection = Product.find()
//   const pipeline = []

//   if (country) {
//     pipeline.push({
//       $search: {
//         index: USER_SEARCH_INDEX_NAME,
//         compound: {
//           must: [
//             {
//               text: {
//                 query: searchQuery,
//                 path: ['name', 'price'],
//                 fuzzy: {},
//               },
//             },
//             {
//               text: {
//                 query: country,
//                 path: 'country',
//               },
//             },
//           ],
//         },
//       },
//     })
//   } else {
//     pipeline.push({
//       $search: {
//         index: USER_SEARCH_INDEX_NAME,
//         text: {
//           query: searchQuery,
//           path: ['fullName', 'email'],
//           fuzzy: {},
//         },
//       },
//     })
//   }

//   pipeline.push({
//     $project: {
//       _id: 0,
//       score: {$meta: 'searchScore'},
//       userId: 1,
//       fullName: 1,
//       email: 1,
//       avatar: 1,
//       registeredAt: 1,
//       country: 1,
//     },
//   })

//   const result = await collection.aggregate(pipeline).sort({score: -1}).limit(10)
//   const array = await result.toArray()
//   res.json(array)

// }
export const searchProduct = async (req, res) => {
  try {
    let results;
    console.log(req.params.productName)
    if (req.params.productName) {
      results = await Product.aggregate([
        {
          $text:{
          $search: {
            index: "autocomplete",
            autocomplete: {
              query: req.params.productName,
              path: "name",
              fuzzy: {
                maxEdits: 1,
              },
              tokenOrder: "sequential",
            },
          },
        }
      },
        {
          $product: {
            name: 1,
            _id: 1,
          },
        },
        {
          $limit: 10,
        },
      ]);
      if (results) return res.send(results);
    }
    res.send([]);
  } catch (error) {
    console.log(error);
    res.send([]);
  }
}