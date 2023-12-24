

const permission = {
    normal_user: async function (req, res) {
        if (!req.user) {
            res.status(400).json({ status: 'failed', err: 'you need to login' });
            return;
        }
        if(req.user.user_type !== 'Normal_user'){
            res.status(403).json({ error: " You are not a normal user."});
            return ;
        }
    },
    employee: async function (req, res) {
        if (!req.user) {
            res.status(400).json({ status: 'failed', err: 'you need to login' });
            return;
        }
        if(req.user.user_type !== 'Employee'){
            res.status(403).json({ error: " You are not an employee."});
            return ;
        }
    },
    delivery: async function (req, res) {
        if (!req.user) {
            res.status(400).json({ status: 'failed', err: 'you need to login' });
            return;
        }
        if(req.user.user_type !== 'Delivery'){
            res.status(403).json({ error: " You are not a delivery."});
            return ;
        }
    },
};

export default permission;