import { client, product_verify } from "../models/data-model.js";

/**
 * 
 * 	create table products(
		product_id serial primary key,
		price float not null,
		product_type varchar not null,
		brand varchar,
		sold_date date,
		discount_id int,
		foreign key (discount_id) references discounts,
		customer_id int,
		center_id int not null,
		foreign key (center_id) references centers
	);
      price:  Joi.number().required(),
        product_type: Joi.string().valid('laptop', 'phone', 'glass','watch').required(),
        brand: Joi.string(),
        center_id: Joi.number().required(),
 */
async function post_product(req,res){
    try{
        const data = req.body;
        const { error } = product_verify.postProduct.validate(data);
        if (error) {
            return  res.status(400).json({ err: error.details[0].message });
        }
        if (!data.brand) {
            var brand = null
        } else {
            var brand = `'${data.brand}'`
        }
        const q = `INSERT INTO public.products(
            price, product_type, brand,center_id)
            VALUES (${data.price}, '${data.product_type}', ${brand}, ${data.center_id});`;
        const result = await client.query(q)
        return res.status(200).send({ msg: "inserted successfuly", status: "success" })
    } catch (err) {
        return res.status(400).json({ msg: "there is an error occured during adding new product, try again", err })
    }
}
async function get_product_by_id(req, res, next) {
    try {
        const { id}=req.params
        if (!id) {
            const err = new Error();
            err.message = "you should specify the parameter id "
            throw err
        }
        let q = `select * from products where product_id=${id} `;
        const result = await client.query(q);
        res.status(200).send({ data: result.rows, status: "success" })
    } catch (error) {
        res.status(500).send({ msg: error, status: "failed" })
    }
}
async function get_products_by_center_id(req, res, next) {
    try {
        const { id}=req.params
        if (!id) {
            const err = new Error();
            err.message = "you should specify the parameter id "
            throw err
        }
        let q = `select * from products where center_id=${id} `;
        const result = await client.query(q);
        res.status(200).send({ data: result.rows, status: "success" })
    } catch (error) {
        res.status(500).send({ msg: error, status: "failed" })
    }
}


async function update_product(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;
        console.log(data)
        if (!parseInt(id)) {
            const err = new Error();
            err.message = "id should be number"
            throw err
        }
        if (!data.price) {
            var price = "";
        }
        else {
            var price = `price=${data.price},`
        }
        if (!data.brand) {
            var brand = ""
        } else {
            var brand = `brand='${data.brand}',`
        }
        if (!data.product_type) {
            var product_type = ""
        } else {
            var product_type = `product_type='${data.product_type}',`
        }
        if (!data.sold_date) {
            var sold_date = ""
        } else {
            var sold_date = `sold_date='${data.sold_date}',`
        }

        if (!data.discount_id) {
            var discount_id = ""
        } else {
            var discount_id = `discount_id=${data.discount_id},`
        }
        if (!data.customer_id) {
            var customer_id = ""
        } else {
            var customer_id = `customer_id=${data.customer_id},`
        }
        if (!data.center_id) {
            var center_id = ""
        } else {
            var center_id = `center_id=${data.center_id},`
        }
        let temp = `${center_id} ${customer_id} ${discount_id} ${sold_date} ${product_type} ${brand} ${price}`
        let setPart = temp.trim();
        if (setPart[setPart.length - 1] == ',') {
            setPart = setPart.slice(0, -1)
            console.log("hi")
        } else
            if (setPart[setPart[setPart.length - 1]] === " " && setPart[setPart.length - 2] === ",") {
                setPart = setPart.slice(0, -1)
            }
        console.log(setPart);
        let q = `UPDATE public.products
        SET ${setPart} WHERE product_id=${id};`
        console.log(q)
        const result = await client.query(q)
        return res.status(200).send({ updated_rows: result.rowCount, status: "success" })
    } catch (error) {
        return res.status(400).send({ msg: error, status: "failed" });

    }
}

/**
 * 
 * 		product_id serial primary key,
		price float not null,
		product_type varchar not null,
		brand varchar,
		sold_date date,
		discount_id int,
		foreign key (discount_id) references discounts,
		customer_id int,
		center_id int not null,
		foreign key (center_id) references centers
 */
async function delete_product(req, res) {
    try {
        const { id } = req.params;
        if (!parseInt(id)) {
            const err = new Error();
            err.message = "id should be number"
            throw err
        }
        let q = `DELETE FROM public.products WHERE product_id=${id};`
        console.log(q)
        const result = await client.query(q)
        return res.status(200).send({ deleted_rows: result.rowCount, status: "success" })
    } catch (error) {
        return res.status(400).send({ msg: error, status: "failed" });

    }
}

export {post_product,get_product_by_id,get_products_by_center_id,update_product,delete_product}