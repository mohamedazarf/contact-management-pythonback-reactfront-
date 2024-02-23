from config import db
class Contact(db.Model):
    __tablename__ = 'contacts'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100),nullable=False,unique=False)
    last_name = db.Column(db.String(100),nullable=False,unique=False)
    email = db.Column(db.String(120),unique=True,nullable=False)
   
    def to_json(self):
            return {
                'id': self.id,
                'firstName': self.first_name,
                'lastName': self.last_name,
                'email': self.email
            }