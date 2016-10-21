CREATE TABLE  [Group](
 [ID] UNIQUEIDENTIFIER PRIMARY KEY,
 [Name] NVARCHAR(50) NOT NULL,
 [ParentID] UNIQUEIDENTIFIER NOT NULL,
 [CreateTime] DATETIME NOT NULL,
 [LastModifyTime] DATETIME NULL,
 [LastModifyUser] UNIQUEIDENTIFIER NULL,
 [Deleted] BIT NOT NULL DEFAULT(0)
)