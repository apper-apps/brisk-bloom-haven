export const productService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "price" } },
          { field: { Name: "original_price" } },
          { field: { Name: "images" } },
          { field: { Name: "category" } },
          { field: { Name: "description" } },
          { field: { Name: "in_stock" } },
          { field: { Name: "colors" } },
          { field: { Name: "occasions" } },
          { field: { Name: "rating" } },
          { field: { Name: "review_count" } }
        ]
      };

      const response = await apperClient.fetchRecords('product', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "price" } },
          { field: { Name: "original_price" } },
          { field: { Name: "images" } },
          { field: { Name: "category" } },
          { field: { Name: "description" } },
          { field: { Name: "in_stock" } },
          { field: { Name: "colors" } },
          { field: { Name: "occasions" } },
          { field: { Name: "rating" } },
          { field: { Name: "review_count" } }
        ]
      };

      const response = await apperClient.getRecordById('product', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  async create(product) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Filter to only include updateable fields
      const updateableData = {
        Name: product.Name || product.name,
        Tags: product.Tags || product.tags,
        Owner: product.Owner || product.owner,
        price: product.price,
        original_price: product.original_price || product.originalPrice,
        images: product.images,
        category: product.category,
        description: product.description,
        in_stock: product.in_stock !== undefined ? product.in_stock : product.inStock,
        colors: product.colors,
        occasions: product.occasions,
        rating: product.rating,
        review_count: product.review_count || product.reviewCount
      };

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.createRecord('product', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create product');
        }
        
        return response.results[0].data;
      }
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Filter to only include updateable fields
      const updateableData = {
        Id: parseInt(id)
      };

      // Add only updateable fields that are provided in updates
      if (updates.Name !== undefined || updates.name !== undefined) updateableData.Name = updates.Name || updates.name;
      if (updates.Tags !== undefined || updates.tags !== undefined) updateableData.Tags = updates.Tags || updates.tags;
      if (updates.Owner !== undefined || updates.owner !== undefined) updateableData.Owner = updates.Owner || updates.owner;
      if (updates.price !== undefined) updateableData.price = updates.price;
      if (updates.original_price !== undefined || updates.originalPrice !== undefined) updateableData.original_price = updates.original_price || updates.originalPrice;
      if (updates.images !== undefined) updateableData.images = updates.images;
      if (updates.category !== undefined) updateableData.category = updates.category;
      if (updates.description !== undefined) updateableData.description = updates.description;
      if (updates.in_stock !== undefined || updates.inStock !== undefined) updateableData.in_stock = updates.in_stock !== undefined ? updates.in_stock : updates.inStock;
      if (updates.colors !== undefined) updateableData.colors = updates.colors;
      if (updates.occasions !== undefined) updateableData.occasions = updates.occasions;
      if (updates.rating !== undefined) updateableData.rating = updates.rating;
      if (updates.review_count !== undefined || updates.reviewCount !== undefined) updateableData.review_count = updates.review_count || updates.reviewCount;

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.updateRecord('product', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update product');
        }
        
        return response.results[0].data;
      }
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('product', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to delete product');
        }
        
        return true;
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
};