﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CSINotification.Core
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class Aptara_ClientPowerTrackEntities : DbContext
    {
        public Aptara_ClientPowerTrackEntities()
            : base("name=Aptara_ClientPowerTrackEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AppConfiguration> AppConfigurations { get; set; }
        public virtual DbSet<EmailNotification> EmailNotifications { get; set; }
    
        public virtual ObjectResult<USP_GetEmailNotification_Result> USP_GetEmailNotification(Nullable<int> emailNotificationID, string subject, string mailContent, string attachedFileName, string receipent, Nullable<int> id, Nullable<int> operation, Nullable<int> createdBy, Nullable<System.DateTime> createdOn, Nullable<int> lastUpdatedBy, Nullable<System.DateTime> lastUpdatedOn)
        {
            var emailNotificationIDParameter = emailNotificationID.HasValue ?
                new ObjectParameter("EmailNotificationID", emailNotificationID) :
                new ObjectParameter("EmailNotificationID", typeof(int));
    
            var subjectParameter = subject != null ?
                new ObjectParameter("Subject", subject) :
                new ObjectParameter("Subject", typeof(string));
    
            var mailContentParameter = mailContent != null ?
                new ObjectParameter("MailContent", mailContent) :
                new ObjectParameter("MailContent", typeof(string));
    
            var attachedFileNameParameter = attachedFileName != null ?
                new ObjectParameter("AttachedFileName", attachedFileName) :
                new ObjectParameter("AttachedFileName", typeof(string));
    
            var receipentParameter = receipent != null ?
                new ObjectParameter("Receipent", receipent) :
                new ObjectParameter("Receipent", typeof(string));
    
            var idParameter = id.HasValue ?
                new ObjectParameter("Id", id) :
                new ObjectParameter("Id", typeof(int));
    
            var operationParameter = operation.HasValue ?
                new ObjectParameter("Operation", operation) :
                new ObjectParameter("Operation", typeof(int));
    
            var createdByParameter = createdBy.HasValue ?
                new ObjectParameter("CreatedBy", createdBy) :
                new ObjectParameter("CreatedBy", typeof(int));
    
            var createdOnParameter = createdOn.HasValue ?
                new ObjectParameter("CreatedOn", createdOn) :
                new ObjectParameter("CreatedOn", typeof(System.DateTime));
    
            var lastUpdatedByParameter = lastUpdatedBy.HasValue ?
                new ObjectParameter("LastUpdatedBy", lastUpdatedBy) :
                new ObjectParameter("LastUpdatedBy", typeof(int));
    
            var lastUpdatedOnParameter = lastUpdatedOn.HasValue ?
                new ObjectParameter("LastUpdatedOn", lastUpdatedOn) :
                new ObjectParameter("LastUpdatedOn", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<USP_GetEmailNotification_Result>("USP_GetEmailNotification", emailNotificationIDParameter, subjectParameter, mailContentParameter, attachedFileNameParameter, receipentParameter, idParameter, operationParameter, createdByParameter, createdOnParameter, lastUpdatedByParameter, lastUpdatedOnParameter);
        }
    
        public virtual int USP_UpdateMailNotificationsByID(Nullable<long> emailNotificationID, Nullable<int> status, string error)
        {
            var emailNotificationIDParameter = emailNotificationID.HasValue ?
                new ObjectParameter("emailNotificationID", emailNotificationID) :
                new ObjectParameter("emailNotificationID", typeof(long));
    
            var statusParameter = status.HasValue ?
                new ObjectParameter("status", status) :
                new ObjectParameter("status", typeof(int));
    
            var errorParameter = error != null ?
                new ObjectParameter("error", error) :
                new ObjectParameter("error", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("USP_UpdateMailNotificationsByID", emailNotificationIDParameter, statusParameter, errorParameter);
        }
    }
}