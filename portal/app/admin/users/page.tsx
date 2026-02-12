'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface UserData {
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  profile: {
    userName: string | null;
    userSchool: string | null;
    userYear: string | null;
    userMajor: string | null;
    userInterest: string | null;
    userPreviousExperience: string | null;
    userHometown: string | null;
  } | null;
  stats: {
    totalContacts: number;
    totalPoints: number;
    totalEmailsSent: number;
  };
  hasPurchased: boolean;
  purchasedAt: string | null;
}

interface UserListResponse {
  users: UserData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function AdminUsersPage() {
  const { user, isLoaded } = useUser();
  const [users, setUsers] = useState<UserData[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<Record<string, unknown> | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, search]);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(search && { search }),
      });

      const response = await fetch(`/api/admin/users?${params}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || 'Failed to fetch users');
      }

      const data: UserListResponse = await response.json();
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserDetails = async (userId: string) => {
    setLoadingDetails(true);
    setSelectedUser(userId);
    setUserDetails(null);

    try {
      const response = await fetch(`/api/admin/users/${userId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const data = await response.json();
      setUserDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user details');
    } finally {
      setLoadingDetails(false);
    }
  };

  if (!isLoaded) {
    return <div style={{ padding: 48 }}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={{ padding: 48 }}>
        <h1>Admin</h1>
        <p>Please sign in to access admin features.</p>
      </div>
    );
  }

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    cursor: 'pointer',
    transition: 'border-color 0.15s',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 14,
    color: '#1a1a1a',
    marginBottom: 8,
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 48 }}>
      <div style={{ marginBottom: 32 }}>
        <Link href="/admin" style={{ color: '#666', fontSize: 14, textDecoration: 'none' }}>
          ← Back to Admin
        </Link>
      </div>

      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>User Profiles</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>
        View user profiles, outreach activity, and settings.
      </p>

      {/* Search */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search by email, name, or school..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPagination(p => ({ ...p, page: 1 }));
          }}
          style={{
            width: '100%',
            maxWidth: 400,
            padding: '12px 16px',
            border: '1px solid #e5e5e5',
            borderRadius: 8,
            fontSize: 14,
          }}
        />
      </div>

      {error && (
        <div style={{
          padding: 16,
          background: '#fee2e2',
          borderRadius: 8,
          marginBottom: 24,
          color: '#991b1b',
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: selectedUser ? '1fr 1fr' : '1fr', gap: 24 }}>
        {/* User List */}
        <div>
          <div style={{ marginBottom: 16, fontSize: 14, color: '#666' }}>
            {pagination.total} users total
          </div>

          {isLoading ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#666' }}>Loading users...</div>
          ) : users.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#666' }}>No users found</div>
          ) : (
            <>
              {users.map((u) => (
                <div
                  key={u.clerkId}
                  onClick={() => fetchUserDetails(u.clerkId)}
                  style={{
                    ...cardStyle,
                    borderColor: selectedUser === u.clerkId ? '#1a1a1a' : '#e5e5e5',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
                        {u.profile?.userName || u.firstName || 'No name'}
                        {u.hasPurchased && (
                          <span style={{
                            marginLeft: 8,
                            padding: '2px 8px',
                            background: '#dcfce7',
                            color: '#166534',
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 500,
                          }}>
                            PAID
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>{u.email}</div>
                      {u.profile?.userSchool && (
                        <div style={{ fontSize: 13, color: '#888' }}>
                          {u.profile.userSchool}
                          {u.profile.userYear && ` • ${u.profile.userYear}`}
                          {u.profile.userMajor && ` • ${u.profile.userMajor}`}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 20, fontWeight: 600 }}>{u.stats.totalContacts}</div>
                      <div style={{ fontSize: 11, color: '#666' }}>contacts</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
                  <button
                    onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                    disabled={pagination.page <= 1}
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: 6,
                      background: pagination.page <= 1 ? '#f5f5f5' : '#fff',
                      cursor: pagination.page <= 1 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Previous
                  </button>
                  <span style={{ padding: '8px 16px', color: '#666' }}>
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                    disabled={pagination.page >= pagination.totalPages}
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: 6,
                      background: pagination.page >= pagination.totalPages ? '#f5f5f5' : '#fff',
                      cursor: pagination.page >= pagination.totalPages ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* User Details Panel */}
        {selectedUser && (
          <div style={{
            background: '#fafafa',
            borderRadius: 12,
            padding: 24,
            position: 'sticky',
            top: 24,
            maxHeight: 'calc(100vh - 96px)',
            overflowY: 'auto',
          }}>
            {loadingDetails ? (
              <div style={{ padding: 24, textAlign: 'center', color: '#666' }}>Loading details...</div>
            ) : userDetails ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 600 }}>User Details</h2>
                  <button
                    onClick={() => {
                      setSelectedUser(null);
                      setUserDetails(null);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 20,
                      color: '#666',
                    }}
                  >
                    ×
                  </button>
                </div>

                {/* Account Info */}
                <section style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#666' }}>ACCOUNT</h3>
                  <div style={labelStyle}>Email</div>
                  <div style={valueStyle}>{(userDetails as { user: { email: string } }).user.email}</div>
                  <div style={labelStyle}>Name</div>
                  <div style={valueStyle}>
                    {(userDetails as { user: { firstName: string | null; lastName: string | null } }).user.firstName || ''} {(userDetails as { user: { firstName: string | null; lastName: string | null } }).user.lastName || ''}
                  </div>
                  <div style={labelStyle}>Last Sign In</div>
                  <div style={valueStyle}>
                    {(userDetails as { user: { lastSignInAt: number | null } }).user.lastSignInAt
                      ? new Date((userDetails as { user: { lastSignInAt: number } }).user.lastSignInAt).toLocaleDateString()
                      : 'Never'}
                  </div>
                </section>

                {/* Profile Info */}
                {(userDetails as { profile: Record<string, unknown> | null }).profile && (
                  <section style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#666' }}>PROFILE</h3>
                    {Object.entries((userDetails as { profile: Record<string, unknown> }).profile).map(([key, value]) => {
                      if (!value || key === 'createdAt' || key === 'updatedAt') return null;
                      const label = key.replace('user', '').replace(/([A-Z])/g, ' $1').trim();
                      return (
                        <div key={key}>
                          <div style={labelStyle}>{label}</div>
                          <div style={valueStyle}>{String(value)}</div>
                        </div>
                      );
                    })}
                  </section>
                )}

                {/* Stats */}
                <section style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#666' }}>ACTIVITY STATS</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {Object.entries((userDetails as { stats: Record<string, number> }).stats).map(([key, value]) => (
                      <div key={key} style={{ background: '#fff', padding: 12, borderRadius: 8 }}>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>{value}</div>
                        <div style={{ fontSize: 12, color: '#666' }}>
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Recent Contacts */}
                {(userDetails as { contacts: Array<{ id: string; name: string; firm: string; status: string }> }).contacts?.length > 0 && (
                  <section style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#666' }}>
                      RECENT CONTACTS ({(userDetails as { contacts: Array<unknown> }).contacts.length})
                    </h3>
                    <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                      {(userDetails as { contacts: Array<{ id: string; name: string; firm: string; status: string }> }).contacts.slice(0, 20).map((contact) => (
                        <div key={contact.id} style={{
                          padding: 8,
                          background: '#fff',
                          borderRadius: 6,
                          marginBottom: 8,
                          fontSize: 13,
                        }}>
                          <div style={{ fontWeight: 500 }}>{contact.name}</div>
                          <div style={{ color: '#666' }}>{contact.firm}</div>
                          <div style={{
                            display: 'inline-block',
                            padding: '2px 6px',
                            background: contact.status === 'advocate' ? '#dcfce7' :
                              contact.status === 'responded' ? '#dbeafe' :
                              contact.status === 'contacted' ? '#fef3c7' : '#f3f4f6',
                            borderRadius: 4,
                            fontSize: 11,
                            marginTop: 4,
                          }}>
                            {contact.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Purchase History */}
                {(userDetails as { purchaseHistory: Array<{ id: string; status: string; amountPaid: number; purchasedAt: string }> }).purchaseHistory?.length > 0 && (
                  <section style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#666' }}>PURCHASES</h3>
                    {(userDetails as { purchaseHistory: Array<{ id: string; status: string; amountPaid: number; purchasedAt: string }> }).purchaseHistory.map((purchase) => (
                      <div key={purchase.id} style={{
                        padding: 8,
                        background: '#fff',
                        borderRadius: 6,
                        marginBottom: 8,
                        fontSize: 13,
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 500 }}>${purchase.amountPaid}</span>
                          <span style={{
                            padding: '2px 6px',
                            background: purchase.status === 'active' ? '#dcfce7' : '#fee2e2',
                            borderRadius: 4,
                            fontSize: 11,
                          }}>
                            {purchase.status}
                          </span>
                        </div>
                        <div style={{ color: '#666', fontSize: 12 }}>
                          {new Date(purchase.purchasedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </section>
                )}
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
