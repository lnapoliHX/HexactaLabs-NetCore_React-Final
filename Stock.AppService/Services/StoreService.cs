using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Stock.AppService.Base;
using Stock.Model.Entities;
using Stock.Repository.LiteDb.Interface;

namespace Stock.AppService.Services
{
    public class StoreService : BaseService<Store>
    {
        public StoreService(IRepository<Store> repository) : base(repository)
        {    
              
        }

        public new Store Create(Store entity)
        {
<<<<<<< HEAD
            if (this.NombreUnico(entity.Id, entity.Name))
=======
            if (this.NombreUnico(entity.Name))
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
            {
                return base.Create(entity);
            }

            throw new System.Exception("The name is already in use");
        }
<<<<<<< HEAD

        private bool NombreUnico(string id, string name)
=======
        private bool NombreUnico(string name)
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return false;
            }

<<<<<<< HEAD
            return this.Repository.List(x => x.Name.ToUpper().Equals(name.ToUpper()) &&
                                             !x.Id.Equals(id)).Count == 0;
        }

        public new Store Update(Store entity)
        {
            if (this.NombreUnico(entity.Id, entity.Name))
            {
                return base.Update(entity);
            }

            throw new System.Exception("The name is already in use");
        }
       
=======
            return this.Repository.List(x => x.Name.ToUpper().Equals(name.ToUpper())).Count == 0;
        }

>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
        public IEnumerable<Store> Search(Expression<Func<Store, bool>> filter)
        {
            return this.Repository.List(filter);
        }
    }
}