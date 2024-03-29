﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Stock.Model.Base
{
    /// <summary>
    /// Interface for all entities.
    /// </summary>
    public interface IEntity
    {
        /// <summary>
        /// Gets or sets the entity id.
        /// </summary>
        string Id { get; set; }
    }
}
